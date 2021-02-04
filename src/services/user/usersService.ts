import { User } from "../../models/user/user";

// A post request should not contain an id.
export type UserCreationParams = Pick<User, "email" | "name" | "phoneNumbers">;

export class UsersService {
  public get(id: string, name?: string): User {
    return {
      id,
      email: "jane@doe.com",
      name: name ?? "Jane Doe",
      status: "Happy",
      phoneNumbers: [],
      isLoggedIn: true
    };
  }

  public create(userCreationParams: UserCreationParams): User {
    return {
      id: '1', //Changing this to a guid so it needs to be string Math.floor(Math.random() * 10000), // Random
      status: "Happy",
      isLoggedIn: false,
      ...userCreationParams,
    };
  }
}
