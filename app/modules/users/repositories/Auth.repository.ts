import { Types } from "mongoose";
import { AuthDocument, authModel } from "../model/Auth.model.js";

export default class AuthRepository  {

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
  async save(data: Object) : Promise<AuthDocument | null>{
    try {
      return await authModel.create(data);
    } catch (err) {
      throw err;
    }
  }

  // fetch all user
  async getAll() {
    try {
      return await authModel.find().exec();
    } catch (error) {
      throw error;
    }
  }

  // delete user
  async deleteById(id: string | Types.ObjectId ): Promise<AuthDocument | null> {
    try {
      return await authModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw error;
    }
  }

  //find user by ID
  async findById(id: string | Types.ObjectId): Promise<AuthDocument | null> {
    try {
      return await authModel.findById(id).exec();
    } catch (error) {
      throw error;
    }
  }

  //edit user by id
  async updateById(
    id: string | Types.ObjectId,
    data: Partial<AuthDocument>
  ): Promise<AuthDocument | null> {
    try {
      return await authModel
        .findByIdAndUpdate(id, data, { new: true })
        .exec();
    } catch (error) {
      throw error;
    }
  }
}

export const authRepo = new AuthRepository();
