// src/users/usersController.ts
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
  Security
} from "tsoa";
import { User } from "../models/user/user";
import { UsersService, UserCreationParams } from "../services/user/usersService";

// @Security('api_key') - will implement jwt auth later
@Route("users")
export class UsersController extends Controller {
  @Get("{userId}")
  public async getUser(
    @Path() userId: string,
    @Query() name?: string
  ): Promise<User> {
    return new UsersService().get(userId, name);
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    new UsersService().create(requestBody);
    return;
  }

  @Security('api_key')
  @Get("{userId}/test")
  public async testUser(@Path() userId: string ) : Promise<User>{
    return new UsersService().get(userId, 'test');
  }
}
