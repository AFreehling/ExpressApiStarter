import { Route, Post, Body, Controller } from 'tsoa';
import { IUserLoginRequest } from './IUserLoginRequest';
import { IUserResponse }  from './IUserResponse';
//import { IMessageResponse } from './IMessageResponse'
import { createAuthToken } from './token-helpers';
import { SecurityService } from './securityService';
import { User } from '../users/user';
//import { logger } from '../../middleware/common/logging';


@Route('Authorizations')
export class AuthorizationsController extends Controller {

  userDataAgent = new SecurityService();

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