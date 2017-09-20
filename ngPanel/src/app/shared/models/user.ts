export enum UserRole {
  USER = 0,
  STUDENT = 1,
  TEACHER = 2,
  ADMIN = 3
}

export interface IUser {
  id: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  role: UserRole;
  created: Date;
  modified: Date;
  activated: boolean;
  locked: boolean;
  token: string;
  avatar: string;
}

export class UserDTO implements IUser {
  id: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  role: UserRole;
  created: Date;
  modified: Date;
  activated: boolean;
  locked: boolean;
  token: string;
  avatar: string;

  constructor(
    id?: number,
    username?: string,
    firstname?: string,
    lastname?: string,
    role?: UserRole,
    created?: Date,
    modified?: Date,
    activated?: boolean,
    locked?: boolean,
    avatar?: string
  ) {
    this.id = id;
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.role = role;
    this.created = created;
    this.modified = modified;
    this.activated = activated;
    this.locked = locked;
    this.avatar = avatar;
  }
}

export interface IStudent {  
  classId: number;
}

export class StudentAdapter implements IStudent {
  id: number;
  classId: number;
  levelName: string;
  specialtyName: string;
  year: string;

  constructor(
    id: number,
    classId: number,
    levelName: string,
    specialtyName: string,
    year: string
  ) {
    this.id = id;
    this.classId = classId;
    this.levelName = levelName;
    this.specialtyName = specialtyName;
    this.year = year;
  }
}

export class StudentDTO extends UserDTO implements IStudent, IUser {
  classId: number;
  id: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  role: UserRole;
  created: Date;
  modified: Date;
  activated: boolean;
  locked: boolean;
  token: string;

  constructor(
    classId?: number,
    id?: number,
    username?: string,
    firstname?: string,
    lastname?: string,
    role?: UserRole,
    created?: Date,
    modified?: Date,
    activated?: boolean,
    locked?: boolean
  ) {
    super(id, username, firstname, lastname, role, created, modified, activated, locked);   
    this.classId = classId;
  }
}

/*export class Student {
  static fromJSON(obj: any): Student {
    return new Student(obj.id, obj.user_id, obj.class_id);
  }

  constructor(
    public id: number = null,
    public userId: number = null,
    public classId: number = null
  ) {}
}*/

export class Credentials {
  constructor(
    public username: string,
    public password: string
  ) {}
}
