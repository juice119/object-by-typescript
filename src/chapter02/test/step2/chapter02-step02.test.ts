import { Screening } from '../../src/movie/step02/Screening';
import { Movie } from '../../src/movie/step02/Movie';
import { Money } from '../../src/money/Money';
import { DiscountPolicy } from '../../src/movie/step02/DiscountPolicy';
import { NoneDiscountPolicy } from '../../src/movie/step02/pricing/NoneDiscountPolicy';
import { Customer } from '../../src/movie/step02/Customer';
import { PercentDiscountPolicy } from '../../src/movie/step02/pricing/PercentDiscountPolicy';
import { SequenceCondition } from '../../src/movie/step02/pricing/SequenceCondition';
import { AmountDiscountPolicy } from '../../src/movie/step02/pricing/AmountDiscountPolicy';
import { PeriodCondition } from '../../src/movie/step02/pricing/PeriodCondition';
import { DayOfWeek } from '../../src/enum/DayOfWeek';

describe('chapter02-step02', () => {
  it('할인 정책이 없는 영화에 영화관 입장시 돈을 낸다.', () => {
    //given
    const customer = new Customer('예약자1', 'testCustomer01');
    const movieAmount = 3000;
    const screening = CreateTestScreening.getScreeningNonePolicy(movieAmount);

    // when
    const audienceCount = 10;
    const reservation = screening.reserve(customer, audienceCount);

    //then
    expect(movieAmount * audienceCount).toBe(reservation.fee.amount);
  });

  it('퍼센트 할인 정책을 적용하면 정상적으로 할인된다.', () => {
    //given
    const customer = new Customer('예약자1', 'testCustomer01');
    const movieAmount = 3000;
    const discountPercent = 0.3;
    const screening = CreateTestScreening.getScreeningPercentPolicy(
      movieAmount,
      discountPercent
    );

    // when
    const audienceCount = 10;
    const reservation = screening.reserve(customer, audienceCount);

    //then
    expect((movieAmount - movieAmount * discountPercent) * audienceCount).toBe(
      reservation.fee.amount
    );
  });

  it('금액 할인 정책을 적용하면 정상적으로 할인된다.', () => {
    //given
    const customer = new Customer('예약자1', 'testCustomer01');
    const discountAmount = 2000;
    const movieAmount = 3000;
    const screening = CreateTestScreening.getScreeningAmountPolicy(
      movieAmount,
      discountAmount
    );

    // when
    const audienceCount = 10;
    const reservation = screening.reserve(customer, audienceCount);

    //then
    expect((movieAmount - discountAmount) * audienceCount).toBe(
      reservation.fee.amount
    );
  });

  it('상영 순번 할인 정책이 맞으면 정상적으로 할인된다.', () => {
    //given
    const customer = new Customer('예약자1', 'testCustomer01');
    const discountSequence = 1;
    const noneDiscountSequence = 2;
    const discountAmount = 2000;
    const movieAmount = 3000;
    const screenings: Screening[] = [
      CreateTestScreening.getScreeningAmountPolicy(
        movieAmount,
        discountAmount,
        discountSequence,
        discountSequence
      ),
      CreateTestScreening.getScreeningAmountPolicy(
        movieAmount,
        discountAmount,
        noneDiscountSequence - 1,
        noneDiscountSequence
      ),
    ];

    // when
    const audienceCount = 10;
    const reservations = screenings.map((screening) =>
      screening.reserve(customer, audienceCount)
    );

    //then
    expect(reservations).toHaveLength(screenings.length);
    expect(reservations[0].fee.amount).toBe(
      (movieAmount - discountAmount) * audienceCount
    );
    expect(reservations[1].fee.amount).toBe(movieAmount * audienceCount);
  });

  it('상영 날짜 할인 정책이 맞으면 정상적으로 할인된다.', () => {
    //given
    const discountAmount = 2000;
    const movieAmount = 3000;
    const startTime = new Date('2021-12-06 12:00:00');
    const endTime = new Date('2021-12-10 14:00:00');
    const dayOfWeek = DayOfWeek.Mon;
    const discountedMovieScreened = new Date('2021-12-06 13:00:00');
    const noneDiscountMovieScreened = new Date('2021-12-11 13:00:00');
    const discountedScreen: Screening =
      CreateTestScreening.getScreeningByPeriod(
        movieAmount,
        discountAmount,
        startTime,
        endTime,
        dayOfWeek,
        discountedMovieScreened
      );
    const noneDiscountScreen: Screening =
      CreateTestScreening.getScreeningByPeriod(
        movieAmount,
        discountAmount,
        startTime,
        endTime,
        dayOfWeek,
        noneDiscountMovieScreened
      );

    // when
    const audienceCount = 10;
    const discountedReservations = discountedScreen.reserve(
      new Customer('예약자1', 'testCustomer01'),
      audienceCount
    );
    const noneDiscountReservations = noneDiscountScreen.reserve(
      new Customer('예약자1', 'testCustomer01'),
      audienceCount
    );

    //then
    expect(discountedReservations.fee.amount).toBe(
      (movieAmount - discountAmount) * audienceCount
    );
    expect(noneDiscountReservations.fee.amount).toBe(
      movieAmount * audienceCount
    );
  });
});

class CreateTestScreening {
  static getScreeningNonePolicy(movieAmount: number) {
    return new Screening(
      this.getMovie(movieAmount),
      1,
      new Date('2021-12-09 13:44:10')
    );
  }

  static getScreeningPercentPolicy(
    movieAmount: number,
    discountPercent: number,
    sequence = 1
  ) {
    return new Screening(
      this.getMovie(
        movieAmount,
        new PercentDiscountPolicy(discountPercent, [
          new SequenceCondition(sequence),
        ])
      ),
      sequence,
      new Date('2021-12-09 13:44:10')
    );
  }

  static getScreeningAmountPolicy(
    movieAmount: number,
    discountAmount: number,
    movieSequence = 1,
    screenSequence?
  ) {
    return new Screening(
      this.getMovie(
        movieAmount,
        new AmountDiscountPolicy(new Money(discountAmount), [
          new SequenceCondition(movieSequence),
        ])
      ),
      screenSequence | movieSequence,
      new Date('2021-12-09 13:44:10')
    );
  }

  static getScreeningByPeriod(
    movieAmount: number,
    discountAmount: number,
    startTime: Date,
    endTime: Date,
    dayOfWeek: DayOfWeek,
    movieScreened: Date
  ) {
    return new Screening(
      this.getMovie(
        movieAmount,
        new AmountDiscountPolicy(new Money(discountAmount), [
          new PeriodCondition(dayOfWeek, startTime, endTime),
        ])
      ),
      1,
      movieScreened
    );
  }

  private static getMovie(
    movieAmount: number,
    discountPolicy?: DiscountPolicy,
    runningTime?: number
  ): Movie {
    return new Movie(
      '테스트 영화',
      runningTime | (60 * 30),
      new Money(movieAmount),
      discountPolicy ? discountPolicy : new NoneDiscountPolicy()
    );
  }
}
