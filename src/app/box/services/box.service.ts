import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { switchMap, map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import * as moment from 'moment';
import * as _ from 'lodash';

import { UserService } from 'src/app/account/services/user.service';
import { IMethod } from './method.service';
import { IType } from './type.service';

export interface IBox {
  id: string;
  userId: string;
  description: string;
  price: number;
  datetime: string;
  condition: boolean;
  confirmed: boolean;
  status: boolean;
  methodId?: string;
  typeId?: string;
  createdAt?: string;
  updatedAt?: string;
  // RELATIONS
  method?: IMethod;
  type?: IType;
}
@Injectable({
  providedIn: 'root'
})
export class BoxService extends Firestore<IBox> {
  constructor(protected db: AngularFirestore, private userService: UserService) {
    super(db);
    this.init();
  }

  private init() {
    this.setCollection(this.BOX_CONTROL);
  }

  getWithRelations(): Observable<IBox[]> {
    return this.userService.getBySession().pipe(
      switchMap(user =>
        combineLatest([
          this.db.collection<IType>('types').valueChanges(),
          this.db.collection<IMethod>('methods').valueChanges()
        ]).pipe(
          switchMap(([r1, r2]) => {
            return this.collection.valueChanges().pipe(
              map(snaps => {
                return snaps
                  .filter(item => item.userId === user.id)
                  .map(snap => {
                    return {
                      ...snap,
                      type: r1.find(item => item.id === snap.typeId),
                      method: r2.find(item => item.id === snap.methodId)
                    };
                  });
              })
            );
          })
        )
      )
    );

    // const constCategory = this.getRelations('types');
    // const constMethod = this.getRelations('methods');
    // return this.userService.getBySession().pipe(
    //   switchMap(user =>
    //     this.collection.snapshotChanges().pipe(
    //       map(snaps => {
    //         return snaps
    //           .map(s => ({
    //             id: s.payload.doc.id,
    //             ...s.payload.doc.data(),
    //             type: constCategory[s.payload.doc.data().typeId],
    //             method: constMethod[s.payload.doc.data().methodId]
    //           }))
    //           .filter(item => item.userId === user.id);
    //       })
    //     )
    //   )
    // );
  }

  getAllByDate(month: number, year: number, queryFn?: QueryFn) {
    const constCategory = this.getRelations('types');
    const constMethod = this.getRelations('methods');
    return this.userService.getBySession().pipe(
      switchMap(user =>
        this.db
          .collection<IBox>(this.BOX_CONTROL, queryFn)
          .snapshotChanges()
          .pipe(
            map(snaps => {
              return snaps
                .map(s => ({
                  id: s.payload.doc.id,
                  ...s.payload.doc.data(),
                  type: constCategory[s.payload.doc.data().typeId],
                  method: constMethod[s.payload.doc.data().methodId]
                }))
                .filter(item => item.userId === user.id)
                .filter(item => {
                  return (
                    moment(item.datetime).format('YYYY-MM') ===
                    moment({ year, month }).format('YYYY-MM')
                  );
                });
            })
          )
      )
    );
  }

  getAllBySession(): Observable<IBox[]> {
    return this.userService
      .getBySession()
      .pipe(
        switchMap(user =>
          this.getWithRelations().pipe(map(snaps => snaps.filter(item => item.userId === user.id)))
        )
      );
  }

  getllForCalendar() {
    return this.getAllBySession().pipe(
      map(snaps => {
        return snaps.map(s => {
          const constDate = moment(s.datetime)
            .utc()
            .format();
          return {
            id: s.id,
            type: 'box',
            title: s.type.name,
            desc: s.price,
            startTime: new Date(constDate),
            endTime: new Date(constDate),
            allDay: true
          };
        });
      })
    );
  }

  getAllByChartMonthYear(year: number, month: number) {
    return this.getWithRelations().pipe(
      map(snaps => {
        const s = snaps.filter(
          item =>
            moment(item.datetime).format('YYYY-MM') === moment({ year, month }).format('YYYY-MM')
        );
        return {
          receiverConfirmed: _.sumBy(s.filter(item => item.condition && item.confirmed), 'price'),
          receiverPending: _.sumBy(s.filter(item => item.condition && !item.confirmed), 'price'),

          payConfirmed: _.sumBy(s.filter(item => !item.condition && item.confirmed), 'price'),
          payPending: _.sumBy(s.filter(item => !item.condition && !item.confirmed), 'price'),

          receiver: _.sumBy(s.filter(item => item.condition), 'price'),
          pay: _.sumBy(s.filter(item => !item.condition), 'price')
        };
      })
    );
  }

  getAllByChartYear(year: number) {
    return this.getWithRelations().pipe(
      map(snaps => {
        const s = snaps.filter(
          item => moment(item.datetime).format('YYYY') === moment({ year }).format('YYYY')
        );
        return {
          receiverConfirmed: _.sumBy(s.filter(item => item.condition && item.confirmed), 'price'),
          receiverPending: _.sumBy(s.filter(item => item.condition && !item.confirmed), 'price'),
          payConfirmed: _.sumBy(s.filter(item => !item.condition && item.confirmed), 'price'),
          payPending: _.sumBy(s.filter(item => !item.condition && !item.confirmed), 'price'),
          receiver: _.sumBy(s.filter(item => item.condition), 'price'),
          pay: _.sumBy(s.filter(item => !item.condition), 'price'),
          month1: _.sumBy(s.filter(item => moment(item.datetime).month() === 0), 'price'),
          month2: _.sumBy(s.filter(item => moment(item.datetime).month() === 1), 'price'),
          month3: _.sumBy(s.filter(item => moment(item.datetime).month() === 2), 'price'),
          month4: _.sumBy(s.filter(item => moment(item.datetime).month() === 3), 'price'),
          month5: _.sumBy(s.filter(item => moment(item.datetime).month() === 4), 'price'),
          month6: _.sumBy(s.filter(item => moment(item.datetime).month() === 5), 'price'),
          month7: _.sumBy(s.filter(item => moment(item.datetime).month() === 6), 'price'),
          month8: _.sumBy(s.filter(item => moment(item.datetime).month() === 7), 'price'),
          month9: _.sumBy(s.filter(item => moment(item.datetime).month() === 8), 'price'),
          month10: _.sumBy(s.filter(item => moment(item.datetime).month() === 9), 'price'),
          month11: _.sumBy(s.filter(item => moment(item.datetime).month() === 10), 'price'),
          month12: _.sumBy(s.filter(item => moment(item.datetime).month() === 11), 'price')
        };
      })
    );
  }

  renderDayWeek() {
    return [
      'Segunda Feira',
      'Terça Feira',
      'Quarta Feira',
      'Quinta Feira',
      'Sexta Feira',
      'Sábado',
      'Domingo'
    ];
  }
}
