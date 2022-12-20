const bcrypt = require('bcrypt');
const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const {
  user: UserModel,
  recovery_code: RecoveryCodeModel,
  user_course: UserCourseModel,
  used_coupons: UsedCouponModel,
} = require('../models');
const { notFound } = require('../libs/errors');
const SALT_ROUNDS = 8;
const SECRET_JWT = 'BEALL20211008';
const { ROLES } = require('../constants/user');

class User {
  static async getUser(id) {
    const user = await UserModel.findOne({ where: { id } });
    if (!user) {
      throw notFound();
    }
    return user;
  }
  static async getUserByEmail(email) {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      throw notFound();
    }
    return user;
  }
  static async createUser(data) {
    const { password } = data;
    const encryptedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const [ADMIN, USER] = ROLES;
    const userData = {
      ...data,
      password: encryptedPassword,
      role: USER,
    };
    return UserModel.create(userData);
  }
  static async activateUser(code) {
    const recoveryCode = await RecoveryCodeModel.findOne({ where: { code } });
    if (!recoveryCode) {
      throw new AuthenticationError('Code not found');
    }
    if (recoveryCode.used) {
      throw new AuthenticationError('Code already used');
    }
    const user = await UserModel.findOne({
      where: { id: recoveryCode.userId },
    });
    user.isActive = true;
    await user.save();
    recoveryCode.used = true;
    await recoveryCode.save();
    return true;
  }
  static async getUserByToken(token) {
    try {
      const decoded = jwt.verify(token, SECRET_JWT);
      const { userEmail } = decoded;

      const user = await UserModel.findOne({
        where: { email: userEmail },
        raw: true,
      });
      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      return null;
    }
  }
  static async updateUserPassword(code, password) {
    const recoveryCode = await RecoveryCodeModel.findOne({ where: { code } });
    if (!recoveryCode || recoveryCode.used) {
      throw notFound();
    }
    const user = await UserModel.findOne({
      where: { id: recoveryCode.userId },
    });

    const encryptedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    user.password = encryptedPassword;
    recoveryCode.used = true;
    await recoveryCode.save();
    return user.save();
  }
  static async updateUser(id, data) {
    const user = await UserModel.findOne({ where: { id } });
    if (!user) {
      throw notFound();
    }
    const { password } = data;
    const userData = {
      ...data,
    };
    if (password) {
      const encryptedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      userData.password = encryptedPassword;
    }

    return user.update(userData);
  }
  static async login(email, password) {
    const user = await UserModel.findOne({ where: { email, isActive: true } });
    if (!user) {
      throw new AuthenticationError('Invalid email or password');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new AuthenticationError('Invalid email or password');
    }

    user.timesLoggedIn = user.timesLoggedIn + 1;
    await user.save();
    const { email: userEmail, name, lastName, role } = user;
    const token = jwt.sign(
      {
        userEmail,
        name,
        lastName,
      },
      SECRET_JWT,
    );
    return {
      token,
      role,
      user,
    };
  }
  static async createManyUserCourse(arrayData, couponId) {
    const courseAlreadyExistOnUser = await UserCourseModel.findOne({
      where: {
        userId: arrayData[0].userId,
        courseId: arrayData[0].courseId,
      },
    });
    if (courseAlreadyExistOnUser) {
      throw new AuthenticationError('Course already exist on user');
    }
    if (couponId) {
      await UsedCouponModel.create({
        couponId,
        userId: arrayData[0].userId,
      });
    }
    return UserCourseModel.bulkCreate(arrayData);
  }
}

module.exports = User;
