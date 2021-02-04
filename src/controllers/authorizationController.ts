import { Route, Post, Body, Controller } from 'tsoa';
import { IUserLoginRequest } from '../models/user/IUserLoginRequest';
import { IUserResponse }  from '../models/user/IUserResponse';
//import { IMessageResponse } from './IMessageResponse'
import { createAuthToken } from '../utilities/token-helpers';
import { AuthService } from '../services/auth/authService';
import { User } from '../models/user/user';
//import { logger } from '../../middleware/common/logging';


@Route('Authorizations')
export class AuthorizationsController extends Controller {

  userDataAgent = new AuthService();

  @Post('Login')
  public async login(@Body() request: IUserLoginRequest): Promise<IUserResponse> {

      let result = await this.userDataAgent.getAuthorizedUser(request);
      if(result.id){
               var authedUser = <User>result;
               let loginResult = Object.assign({account:{ user:{authedUser} ,  token:createAuthToken( result.id) } });
               var aUser = <IUserResponse>(loginResult);
               return aUser;
       }else{
          throw result;
       }
  }

  // @Post('Logout')
  // public async logout( @Header('x-access-token') authentication: string ): Promise<IMessageResponse> {
  //        //  TODO: set up validation with redis and tracking of token... especially when email validation is available.
         
  //        let logoutResult = Object.assign({general:{ message:'user logged out', success:true } });
  //        return <IMessageResponse>(logoutResult);
  // }

}