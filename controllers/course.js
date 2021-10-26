const { Op } = require("sequelize");
const {
  course: CourseModel,
  user_course: UserCourseModel,
  course_review: CourseReviewModel,
  sequelize,
} = require("../models");
const { notFound, invalidComment } = require("../libs/errors");

class Course {
  static async get(id) {
    const course = await CourseModel.findOne({ where: { id } });
    if (!course) {
      throw notFound();
    }
    return course;
  }
  static async getFilter(title, category) {
    const conditional = { where: {} };
    if (title) {
      conditional.where.title = {
        [Op.like]: `%${title.toLowerCase()}%`,
      };
    }
    if (category) {
      conditional.where.category = category;
    }
    const courses = await CourseModel.findAll(conditional);
    return courses;
  }
  static async getUserCourses(userId, title) {
    const where = {};
    if (title) {
      where.title = {
        [Op.like]: `%${title.toLowerCase()}%`,
      };
    }
    const courses = await UserCourseModel.findAll({
      where: { userId },
      include: [
        {
          model: CourseModel,
          required: true,
          where,
        },
      ],
      raw: true,
      nest: true,
    });
    return courses;
  }
  static async saveCourseReview(userId, data) {
    const { comment, title, courseId, rate } = data;
    const isCoursePurchased = await UserCourseModel.findOne({
      where: { userId, courseId, isPay: true },
      attributes: ["id"],
      raw: true,
    });
    if (!isCoursePurchased) {
      throw invalidComment();
    }
    const isCourseCommented = await CourseReviewModel.findOne({
      where: { userId, courseId },
      attributes: ["id"],
      raw: true,
    });
    if (isCourseCommented) {
      throw invalidComment();
    }
    try {
      const courseReview = await CourseReviewModel.create({
        comment,
        title,
        courseId,
        rate,
        userId,
      });
      const [avgReview] = await CourseReviewModel.findAll({
        attributes: [[sequelize.fn("AVG", sequelize.col("rate")), "avgRate"]],
        where: { courseId },
        raw: true,
      });
      const { avgRate } = avgReview;
      const course = await CourseModel.findOne({ where: { id: courseId } });
      course.averageRate = avgRate;
      await course.save();
      return courseReview;
    } catch (error) {
      throw invalidComment();
    }
  }
  // static async createCourse(data) {
  //   const { password } = data;
  //   const encryptedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  //   console.log({ encryptedPassword }, "------------------");
  //   const [ADMIN, USER] = ROLES;
  //   const userData = {
  //     ...data,
  //     password: encryptedPassword,
  //     role: USER,
  //   };
  //   return UserModel.create(userData);
  // }
}

module.exports = Course;
