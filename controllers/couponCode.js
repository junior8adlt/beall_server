const { coupon_code: CouponCodeModel, course: CourseModel } = require('../models');
const { notFound, couponExpire } = require('../libs/errors');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
const { Op } = require('sequelize');

const include = [
  {
    model: CourseModel,
    required: true,
  },
];
class CouponCode {
  static async createCoupon(data) {
    const { couponCodeName, courseId, isGlobal, discountPercentage, expirationTime } = data;
    let course = null;
    if (isGlobal && courseId) {
      throw new Error('No puedes especificar un courseId para un cupón global');
    }

    if (!isGlobal && !courseId) {
      throw new Error('Debes especificar un courseId para un cupón no global');
    }

    if (!isGlobal) {
      const course = await CourseModel.findOne({ where: { id: courseId } });
      if (!course) {
        throw notFound();
      }
    }
    course = await CourseModel.findOne({ where: { id: courseId } });
    const validateCouponName = await CouponCodeModel.findOne({
      where: { couponCodeName },
    });
    if (validateCouponName) {
      throw new Error('Este cupón ya existe');
    }

    const utcExpirationTime = dayjs.utc(expirationTime);

    const couponCode = await CouponCodeModel.create({
      couponCodeName,
      courseId: isGlobal ? null : courseId,
      isGlobal,
      discountPercentage,
      expirationTime: utcExpirationTime,
    });

    const dataWithCourse = {
      ...couponCode.dataValues,
      course: isGlobal ? null : course,
    };

    return dataWithCourse;
  }
  static async updateCoupon(id, data) {
    const { expirationTime, courseId } = data;
    const couponCode = await CouponCodeModel.findOne({
      where: { id },
    });
    if (!couponCode) {
      throw notFound();
    }
    const course = await CourseModel.findOne({ where: { id: courseId } });

    const utcExpirationTime = dayjs.utc(expirationTime);

    const couponUpdate = await couponCode.update({
      ...data,
      expirationTime: utcExpirationTime,
    });

    const dataWithCourse = {
      ...couponUpdate.dataValues,
      course,
    };
    return dataWithCourse;
  }

  static async deleteCoupon(id) {
    try {
      const couponCode = await CouponCodeModel.findOne({
        where: { id },
      });
      if (!couponCode) {
        throw notFound();
      }
      await CouponCodeModel.destroy({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error(error, '--------------error');
      return false;
    }
  }

  static async validateCoupon(couponCodeName) {
    const couponCode = await CouponCodeModel.findOne({
      where: { couponCodeName },
    });
    if (!couponCode) {
      throw new Error('El código de descuento introducido no es válido para este curso.');
    }
    const utcExpirationTime = dayjs.utc(couponCode.expirationTime);
    const utcCurrentTime = dayjs.utc();
    if (utcExpirationTime.isBefore(utcCurrentTime)) {
      throw couponExpire();
    }
    return couponCode;
  }

  static async getCoupon(couponId) {
    const couponCode = await CouponCodeModel.findOne({
      where: { couponId },
      include,
    });
    if (!couponCode) {
      throw notFound();
    }
    return couponCode;
  }
  static async getAllCoupons(id) {
    let where = {};
    const include = [
      {
        model: CourseModel,
        required: false,
      },
    ];

    if (id) {
      where = { courseId: id };
    } else {
      where = { [Op.or]: [{ courseId: { [Op.not]: null } }, { courseId: null }] };
    }

    const couponCodes = await CouponCodeModel.findAll({
      where,
      include,
    });

    return couponCodes;
  }
}

module.exports = CouponCode;
