interface UserDataProps {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  age: number;
  bdate: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}
interface SignUpProps {
  username: string;
  firstname: string;
  lastname: string;
  age: number;
  bdate: string;
  email: string;
  password: string;
}
interface LoginProps {
  username: string;
  email: string;
  password: string;
}

interface HandleReturnProps {
  data: { message: string } | null;
  error: string | null;
}

interface LoginResetErrorProps {
  formData: LoginProps;
}
interface SignUpResetErrorProps {
  formData: SignUpProps;
}

interface updateInfo {
  username: string;
  age: number;
  bdate: string;
  email: string;
}

interface updateInfoProps {
  formData: updateInfo | undefine;
  id: string;
}

interface NewPostProps {
  post: string;
  id: string;
}

interface AllPostsProps {
  replace(arg0: RegExp, arg1: string): string | TrustedHTML;
  _id: string;
  post: string;
  creator: UserDataProps;
  comments: [string];
  likes: [string];
}

interface PostUserIDProps {
  userID: string;
  postID: string;
}

interface commentsProps {
  user: {
    username: string;
    firstname: string;
    lastname: string;
    user_id: string;
  };
  comment: string;
  _id: string;
}

interface CreateCommentsProps {
  postID: string;
  userID: string;
  comment: string;
}
