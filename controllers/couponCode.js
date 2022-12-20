const { coupon_code: CouponCodeModel, course: CourseModel } = require('../models');
const { notFound, couponExpire } = require('../libs/errors');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
const include = [
  {
    model: CourseModel,
    required: true,
  },
];
class CouponCode {
  static async createCoupon(data) {
    const { couponCodeName, courseId, discountPercentage, expirationTime } = data;
    if (courseId) {
      const course = await CourseModel.findOne({ where: { id: courseId } });
      if (!course) {
        throw notFound();
      }
      const validateCouponName = await CouponCodeModel.findOne({
        where: { couponCodeName },
      });
      if (validateCouponName) {
        throw new Error('Este cupon ya existe');
      }
      const utcExpirationTime = dayjs.utc(expirationTime);
      const couponCode = await CouponCodeModel.create({
        couponCodeName,
        courseId,
        discountPercentage,
        expirationTime: utcExpirationTime,
      });
      const dataWithCourse = {
        ...couponCode.dataValues,
        course,
      };
      return dataWithCourse;
    } else {
      throw notFound();
    }
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
    const where = id ? { courseId: id } : {};
    const couponCode = await CouponCodeModel.findAll({
      where,
      include,
    });

    return couponCode;
  }
}

module.exports = CouponCode;
