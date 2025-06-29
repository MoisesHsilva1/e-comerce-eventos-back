import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UserService } from 'src/module/user/service/user.service';
import { User } from 'src/module/user/model/user.model';
import { UnauthorizedException } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    @Inject('FIREBASE_ADMIN')
    private readonly firebaseApp: admin.app.App,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async login(idToken: string): Promise<User> {
    const decoded = await this.firebaseApp.auth().verifyIdToken(idToken);
    const uid = decoded.uid;

    const user = await this.userService.findByUid(uid);

    if (!user) {
      throw new UnauthorizedException('User not found.');
    }

    return user;
  }
}
