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

// Mock para a Lista de Tarefas
export const mockTaskList: Task[] = [
  {
    id: "1",
    title: "Criar layout de login",
    description:
      "Desenvolver o design responsivo e acessível para a tela de login do sistema.",
    priority: "Alta",
    dueDate: "10/07/2024",
    status: "Não iniciado",
  },
  {
    id: "2",
    title: "Revisar requisitos do projeto",
    description:
      "Verificar se todos os requisitos funcionais foram atendidos conforme especificado no documento.",
    priority: "Média",
    dueDate: "15/07/2024",
    status: "Em andamento",
  },
  {
    id: "3",
    title: "Implementar autenticação",
    description:
      "Desenvolver a funcionalidade de login e cadastro de usuários.",
    priority: "Alta",
    dueDate: "20/07/2024",
    status: "Concluído",
  },
  {
    id: "4",
    title: "Testar API",
    description: "Realizar testes unitários e de integração para a API.",
    priority: "Média",
    dueDate: "18/07/2024",
    status: "Não iniciado",
  },
  {
    id: "5",
    title: "Refatorar código",
    description: "Melhorar a estrutura e legibilidade do código existente.",
    priority: "Baixa",
    dueDate: "22/07/2024",
    status: "Em andamento",
  },
  {
    id: "6",
    title: "Documentar funcionalidades",
    description: "Criar documentação detalhada das novas funcionalidades.",
    priority: "Alta",
    dueDate: "25/07/2024",
    status: "Não iniciado",
  },
  {
    id: "7",
    title: "Configurar ambiente de produção",
    description: "Configurar servidores e deploy do ambiente de produção.",
    priority: "Média",
    dueDate: "30/07/2024",
    status: "Em andamento",
  },
  {
    id: "8",
    title: "Revisar código de terceiros",
    description: "Verificar e integrar código desenvolvido por parceiros.",
    priority: "Baixa",
    dueDate: "28/07/2024",
    status: "Concluído",
  },
  {
    id: "9",
    title: "Planejar sprints",
    description: "Definir e planejar as próximas sprints do projeto.",
    priority: "Alta",
    dueDate: "01/08/2024",
    status: "Não iniciado",
  },
  {
    id: "10",
    title: "Monitorar desempenho do sistema",
    description: "Implementar ferramentas de monitoramento de desempenho.",
    priority: "Média",
    dueDate: "05/08/2024",
    status: "Em andamento",
  },
  {
    id: "11",
    title: "Implementar cache",
    description: "Adicionar caching para melhorar a performance do sistema.",
    priority: "Alta",
    dueDate: "10/08/2024",
    status: "Concluído",
  },
  {
    id: "12",
    title: "Atualizar bibliotecas",
    description: "Atualizar dependências e bibliotecas do projeto.",
    priority: "Média",
    dueDate: "15/08/2024",
    status: "Não iniciado",
  },
  {
    id: "13",
    title: "Realizar backup",
    description: "Configurar e executar backups regulares do banco de dados.",
    priority: "Alta",
    dueDate: "20/08/2024",
    status: "Em andamento",
  },
  {
    id: "14",
    title: "Implementar notificações",
    description: "Adicionar sistema de notificações para alertas importantes.",
    priority: "Baixa",
    dueDate: "25/08/2024",
    status: "Concluído",
  },
  {
    id: "15",
    title: "Corrigir bugs críticos",
    description:
      "Identificar e corrigir bugs que afetam o funcionamento do sistema.",
    priority: "Alta",
    dueDate: "30/08/2024",
    status: "Não iniciado",
  },
  {
    id: "16",
    title: "Treinar equipe",
    description:
      "Realizar treinamentos sobre novas funcionalidades para a equipe.",
    priority: "Média",
    dueDate: "05/09/2024",
    status: "Em andamento",
  },
  {
    id: "17",
    title: "Melhorar UI/UX",
    description: "Aprimorar a experiência e interface do usuário.",
    priority: "Alta",
    dueDate: "10/09/2024",
    status: "Concluído",
  },
  {
    id: "18",
    title: "Realizar testes de carga",
    description: "Testar o sistema sob condições de alta carga.",
    priority: "Média",
    dueDate: "15/09/2024",
    status: "Não iniciado",
  },
  {
    id: "19",
    title: "Integrar sistema de pagamento",
    description: "Adicionar integração com plataforma de pagamento.",
    priority: "Alta",
    dueDate: "20/09/2024",
    status: "Em andamento",
  },
  {
    id: "20",
    title: "Atualizar design do dashboard",
    description: "Redesenhar o dashboard para melhor visualização de dados.",
    priority: "Média",
    dueDate: "25/09/2024",
    status: "Concluído",
  },
];
