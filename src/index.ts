import 'dotenv/config';

const appName: string = process.env.APP_NAME || 'My Application';
const appVersion: string = process.env.APP_VERSION || '1.0.0';
const appPort: number = Number(process.env.APP_PORT || 3000);
const isActive: boolean = true;

type StudentId = number;

type StudentStatus = 'active' | 'inactive';

interface IStudent {
  id: StudentId;
  name: string;
  age: number;
  status: StudentStatus;
}

class Student implements IStudent {
  constructor(
    public id: StudentId,
    public name: string,
    public age: number,
    public status: StudentStatus = 'active',
  ) {}

  public getInfo(): string {
    return `ID: ${this.id}, Ім'я: ${this.name}, Вік: ${this.age}, Статус: ${this.status}`;
  }

  public deactivate(): void {
    this.status = 'inactive';
  }
}

class Repository<T extends { id: number }> {
  private items: T[] = [];

  public add(item: T): void {
    this.items.push(item);
  }

  public getAll(): T[] {
    return this.items;
  }

  public findById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }
}

const student1 = new Student(1, 'Олександр', 20);
const student2 = new Student(2, 'Марія', 19);
const student3 = new Student(3, 'Андрій', 21);

const studentRepository = new Repository<Student>();

studentRepository.add(student1);
studentRepository.add(student2);
studentRepository.add(student3);

console.log(`Застосунок: ${appName}`);
console.log(`Версія: ${appVersion}`);
console.log(`Порт: ${appPort}`);
console.log(`Активний: ${isActive}`);

console.log('\nСписок студентів:');

studentRepository.getAll().forEach((student) => {
  console.log(student.getInfo());
});

console.log('\nПошук студента з ID = 2:');

const foundStudent = studentRepository.findById(2);

if (foundStudent) {
  console.log(foundStudent.getInfo());
}

console.log('\nЗміна статусу студента:');

student1.deactivate();
console.log(student1.getInfo());
