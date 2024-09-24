import { AuthDocument, authModel } from "../model/Auth.model.js";
// import { AbstractClass } from "../../../helper/abstractClass/AbstractClass.repository.js";
// import { Document, FilterQuery, Model, Types } from "mongoose";
export class AuthRepository  {

  // find existing user
   async findUser(query: Object){
    try {
      const user = await authModel.findOne(query);
      console.log("Result of findOne:",user);      
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // save user
  async save(data: Object) {
    try {
      return await authModel.create(data);
    } catch (err) {
      throw err;
    }
  }

  // fetch all user
  // async getAll(): Promise<ModelType[]> {
  //   try {
  //     return await this.modelName.find().exec();
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // delete user
  // async deleteById(id: string | Types.ObjectId): Promise<ModelType | null> {
  //   try {
  //     return await this.modelName.findByIdAndDelete(id).exec();
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  //find user by ID
  // async findById(id: string | Types.ObjectId): Promise<ModelType | null> {
  //   try {
  //     return await this.modelName.findById(id).exec();
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  //edit user by id
  // async updateById(
  //   id: string | Types.ObjectId,
  //   data: Partial<ModelType>
  // ): Promise<ModelType | null> {
  //   try {
  //     return await this.modelName
  //       .findByIdAndUpdate(id, data, { new: true })
  //       .exec();
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}

export const authRepo = new AuthRepository();
