import { Movie } from './Movie';
import { Money } from '../../money/Money';
import { Customer } from './Customer';
import { Reservation } from './Reservation';

export class Screening {
  private movie: Movie;
  private readonly sequence: number;
  private readonly whenScreened: Date;

  constructor(movie: Movie, sequence: number, whenScreened: Date) {
    this.movie = movie;
    this.sequence = sequence;
    this.whenScreened = whenScreened;
  }

  public getStartTime(): Date {
    return this.whenScreened;
  }

  public isSequence(sequence: number): boolean {
    return this.sequence == sequence;
  }

  public getMovieFee(): Money {
    return this.movie.getFee();
  }

  public reserve(customer: Customer, audienceCount: number): Reservation {
    return new Reservation(
      customer,
      this,
      this.calculateFee(audienceCount),
      audienceCount
    );
  }

  private calculateFee(audienceCount: number): Money {
    return this.movie.calculateMovieFee(this).times(audienceCount);
  }
}
