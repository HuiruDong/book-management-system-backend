import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DbService } from '../db/db.service';
import { Book } from './entities/book.entity';

function randomNum() {
  return Math.floor(Math.random() * 1000000);
}

@Injectable()
export class BookService {
  @Inject()
  dbService: DbService;

  async list() {
    const books: Book[] = await this.dbService.read();

    return books;
  }

  async findById(id: number) {
    const books: Book[] = await this.dbService.read();

    return books.find((item) => item.id === id);
  }

  async create(createBookDto: CreateBookDto) {
    const books: Book[] = await this.dbService.read();

    const book = new Book();
    book.id = randomNum();
    book.name = createBookDto.name;
    book.author = createBookDto.author;
    book.cover = createBookDto.cover;
    book.description = createBookDto.description;

    books.push(book);
    await this.dbService.write(books);

    return book;
  }

  async update(updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.dbService.read();
    const targetBook = books.find((item) => item.id === updateBookDto.id);

    if (!targetBook) {
      throw new BadRequestException('该图书不存在');
    }

    targetBook.author = updateBookDto.author;
    targetBook.cover = updateBookDto.cover;
    targetBook.description = updateBookDto.description;
    targetBook.name = updateBookDto.name;

    await this.dbService.write(books);

    return targetBook;
  }

  async delete(id: number) {
    const books: Book[] = await this.dbService.read();
    const targetIndex = books.findIndex((item) => item.id === id);

    if (targetIndex <= -1) {
      throw new BadRequestException('该图书不存在');
    }

    books.splice(targetIndex, 1);
    await this.dbService.write(books);

    return 'done';
  }
}
