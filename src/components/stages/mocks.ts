export interface IListData {
  id: string;
  title: string;
  description: string;
  tag: string;
  assignee: string;
  dueDate: string;
}

export const todoData: IListData[] = [
  {
    id: 'card-1',
    title: 'Flow Meter Measurement Errors',
    description: 'https://blog.gesrepair.com/',
    tag: 'Long Form',
    assignee: 'Peter Drury',
    dueDate: '09/15/2019'
  },
  {
    id: 'card-2',
    title: 'Flow Meter Measurement Errors 2',
    description: 'https://blog.gesrepair.com/',
    tag: 'SEO Article',
    assignee: 'Peter Drury',
    dueDate: '09/15/2019'
  },
  {
    id: 'card-3',
    title: 'Flow Meter Measurement Errors 3',
    description: 'https://blog.gesrepair.com/',
    tag: 'Blog Post',
    assignee: 'Peter Drury',
    dueDate: '09/15/2019'
  },
  {
    id: 'card-4',
    title: 'Flow Meter Measurement Errors 4',
    description: 'https://blog.gesrepair.com/',
    tag: 'Long Form',
    assignee: 'Peter Drury',
    dueDate: '09/15/2019'
  },
  {
    id: 'card-5',
    title: 'Flow Meter Measurement Errors 5',
    description: 'https://blog.gesrepair.com/',
    tag: 'Blog Post',
    assignee: 'Peter Drury',
    dueDate: '09/15/2019'
  },
  {
    id: 'card-6',
    title: 'Flow Meter Measurement Errors 6',
    description: 'https://blog.gesrepair.com/',
    tag: 'SEO Article',
    assignee: 'Peter Drury',
    dueDate: '09/15/2019'
  },
  {
    id: 'card-7',
    title: 'Flow Meter Measurement Errors 7',
    description: 'https://blog.gesrepair.com/',
    tag: 'Long Form',
    assignee: 'Peter Drury',
    dueDate: '09/15/2019'
  }
];

export const columnNames = ['Todo', 'In Progress', 'Done'];

export const colors = ['#D8D8D8', '#FBEDCE', '#90eebf'];