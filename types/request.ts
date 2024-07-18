// Tipagens para o formulário de Login
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

// Tipagens para o formulário de Criação de Tarefas
export type CreateTaskForm = {
  title: string;
  description: string;
  priority: "Alta" | "Média" | "Baixa";
  dueDate: string; // Aqui pode ser um Date em formato string, dependendo do uso no front-end
};

// Tipagens para o formulário de Edição de Tarefas
export type EditTaskForm = {
  title: string;
  description: string;
  priority: "Alta" | "Média" | "Baixa";
  dueDate: string; // Também pode ser um Date em formato string
};

// Tipagens para as Configurações do Usuário
export type UserSettings = {
  changePassword: boolean;
  notificationPreferences: {
    email: boolean;
    push: boolean;
  };
};

// Tipagem para a Tarefa
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
