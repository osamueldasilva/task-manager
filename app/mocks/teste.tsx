import {
  CreateTaskForm,
  EditTaskForm,
  LoginForm,
  RegisterForm,
  Task,
  UserSettings,
} from "@/types/request";

export const mockLoginForm: LoginForm = {
  usernameOrEmail: "samuel.silva",
  password: "senha123",
};

export const mockRegisterForm: RegisterForm = {
  username: "samuel.silva",
  name: "samuel Barbosa",
  email: "samuel.silva@email.com",
  password: "novaSenha456",
};
export const mockDataUser: RegisterForm = {
  username: "samuel.silva",
  name: "samuel Barbosa",
  email: "samuel.silva@email.com",
  password: "novaSenha456",
};

export const mockCreateTaskForm: CreateTaskForm = {
  title: "Criar layout de login",
  description:
    "Desenvolver o design responsivo e acessível para a tela de login do sistema.",
  priority: "Alta",
  dueDate: "2024-07-10",
};

export const mockEditTaskForm: EditTaskForm = {
  title: "Revisar requisitos do projeto",
  description:
    "Verificar se todos os requisitos funcionais foram atendidos conforme especificado no documento.",
  priority: "Média",
  dueDate: "2024-07-15",
};

export const mockUserSettings: UserSettings = {
  changePassword: true,
  notificationPreferences: {
    email: true,
    push: false,
  },
};
