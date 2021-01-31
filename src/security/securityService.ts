import { UsersService } from "../users/usersService"
import { User } from "../users/user"

export class SecurityService {
    
    async getAuthorizedUser(auth:any):Promise<any> {
        var userService = new UsersService;
        let authorizedUserResult = await userService.get(1, "test");
        if(!authorizedUserResult){
              return  {thrown:true, status:401,  message: "no username "+auth.username+" currently exist"};
        }
        // let passwordsMatch =   await UserSchema.methods.comparePassword( auth.password, authorizedUserResult);
        // if(!passwordsMatch){
        //       return  {thrown:true, status:401,  message: "username or password is incorrect"};
  
        // }
        //var userProfile = <IUserDocument>authorizedUserResult;
        var userProfile = <User>authorizedUserResult;
        userProfile.isLoggedIn = true;
        // let savedResult = await userProfile.save();
        // if(savedResult.errors){
        //     return  {thrown:true, status:422,  message: "db is currently unable to process request"};
        // }
        return authorizedUserResult;
    }
    
}