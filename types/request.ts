// Tipagens para o formulário de Login
export type LoginForm = {
  usernameOrEmail: string;
  password: string;
};

// Tipagens para o formulário de Cadastro
export type RegisterForm = {
  username: string;
  email: string;
  password: string;
  name: string;
};

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
  task: ObjectTask[];
};
