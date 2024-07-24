export type LoginForm = {
  usernameOrEmail: string;
  password: string;
};

export interface RegisterForm {
  id: number;
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateTaskForm = {
  title: string;
  description: string;
  priority: "Alta" | "Média" | "Baixa";
  dueDate: string; // Aqui pode ser um Date em formato string, dependendo do uso no front-end
};

export type EditTaskForm = {
  title: string;
  description: string;
  priority: "Alta" | "Média" | "Baixa";
  dueDate: string;
};

export type UserSettings = {
  changePassword: boolean;
  notificationPreferences: {
    email: boolean;
    push: boolean;
  };
};

export type ObjectTask = {
  id: number;
  title: string;
  description: string;
  priority: "Alta" | "Média" | "Baixa";
  dueDate: string;
  status: "Não iniciado" | "Em andamento" | "Concluído";
};

export type Task = {
  tasks: ObjectTask[];
};

export type ObjectComments = {
  id: number;
  comments: string;
  createdAt: string;
  updatedAt: string;
  taskId: number;
};

export type Comments = {
  comments: ObjectComments[];
};
