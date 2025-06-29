import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/module/user/model/user.model';
import * as admin from 'firebase-admin';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject('FIREBASE_ADMIN') private readonly firebaseApp: admin.app.App,
  ) {}

  async findByUid(uid: string): Promise<User | null> {
    return this.userModel.findOne({ uid }).exec();
  }

  async create(userData: {
    name: string;
    email: string;
    password: string;
  }): Promise<User> {
    const firebaseUser = await this.firebaseApp.auth().createUser({
      displayName: userData.name,
      email: userData.email,
      password: userData.password,
    });

    const createdUser = new this.userModel({
      uid: firebaseUser.uid,
      name: userData.name,
      email: userData.email,
    });

    return createdUser.save();
  }
}
