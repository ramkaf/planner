// import { Test } from "@nestjs/testing"
// import { AuthService } from "./providers/auth.service"
// import { UsersService } from "./../users/providers/users.service"
// import { SignUpDto } from "./dto/signup.dto";
// import { User } from "../users/entities/user.entity";
// import { IUser } from "../users/interfaces/user.interface";
// import { JwtToolService } from "./providers/jwt.service";
// import { PasswordService } from "./providers/password.service";
// import { EmailService } from "../mailer/providers/mailer.service";

// describe('AuthService',() => {
//   let service:AuthService ;
//   let muckJwtToolService:Partial<JwtToolService> = {
//     getJwtToken: jest.fn((user: IUser) => {
//       return `mocked-jwt-token-for-${user.email}`;
//     }),
//   }
//   let muckPasswordService:Partial<PasswordService> = {}
//   let muckmailerService:Partial<EmailService> = {}
//   let muckUsersService:Partial<UsersService> = {
//     create: jest.fn((signUpDto: SignUpDto, password: string) => {
//       const { confirmPassword, ...rest } = signUpDto;
//       return Promise.resolve({
//         id: 1,
//         ...rest,
//         password,
//       } as IUser);
//     }),
//     save: jest.fn((user:User) => Promise.resolve(user)),

//     findByCredentials: jest.fn((identifier: string) =>
//       Promise.resolve(null) // Returning null when no user is found
//     ),
//   }
//   const mockUserRepository = {
//     create: jest.fn((user) => ({
//       id: Date.now(),
//       ...user,
//     })),
//     save: jest.fn((user) => Promise.resolve(user)),
//     findOne: jest.fn((criteria) => {
//       if (criteria.where && criteria.where.email === 'existing@example.com') {
//         return Promise.resolve({
//           id: 1,
//           email: 'existing@example.com',
//           username: 'existingUser',
//           password: 'hashedPassword123',
//           role: { id: 1, name: 'admin', permissions: ['read', 'write'] },
//         });
//       }
//       return Promise.resolve(null);
//     }),
//     findByCredentials: jest.fn((emailOrUsername) => {
//       if (emailOrUsername === 'existing@example.com') {
//         return Promise.resolve({
//           id: 1,
//           email: 'existing@example.com',
//           username: 'existingUser',
//           password: 'hashedPassword123',
//           role: { id: 1, name: 'admin', permissions: ['read', 'write'] },
//         });
//       }
//       return Promise.resolve(null);
//     }),
//     delete: jest.fn((id) => Promise.resolve({ affected: 1 })),
//   };

//   beforeEach(async () => {

//   const module = await Test.createTestingModule({
//       providers : [
//           AuthService,
//           {
//               provide : UsersService,
//               useValue : muckUsersService
//           },
//           {
//             provide : PasswordService,
//             useValue : muckPasswordService
//         },
//           {
//             provide : EmailService,
//             useValue  : muckmailerService
//           },
//           {
//             provide : JwtToolService,
//             useValue  : muckJwtToolService
//           }
//       ]
//   }).compile()

//    service = module.get(AuthService)
//   })

//   it('can create an instance of auth service', async () => {
//       expect(service).toBeDefined()
//   })
// })
