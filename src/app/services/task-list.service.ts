import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TaskList } from '../domain';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { from } from 'rxjs/observable/from';
import { mergeMap, count, switchMap, map } from 'rxjs/operators';


@Injectable()
export class TaskListService {
    private readonly domain = 'taskLists';
    private headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
    constructor(
        private http: HttpClient, 
        @Inject('BASE_CONFIG') private config: { uri: string }){

    }

    // POST /taskLists
    add(taskList: TaskList): Observable<TaskList> {
        const uri = `${this.config.uri}/${this.domain}`;
        taskList.id = null;
        return this.http
            .post<TaskList>(uri, JSON.stringify(taskList), { headers: this.headers });
    }



    //put,更新全部字段，patch可以选择更新的字段
    update(taskList: TaskList): Observable<TaskList>{
        const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
        const toUpdate = {
            name: taskList.name,
            desc: taskList.desc,
            coverImg: taskList.coverImg,
        }
        return this.http
            .patch<TaskList>(uri, JSON.stringify(toUpdate), { headers: this.headers });
    }

    //delete
    del(taskList: TaskList): Observable<TaskList> {
        const deltask$ = from(taskList.taskLists ? taskList.taskLists : [])
          .pipe(
            mergeMap(listId => this.http
              .delete(`${this.config.uri}/taskLists/${listId}`)),
            count()
          );
        const uri = `${this.config.uri}/${this.domain}/${taskList.id}`;
        return deltask$
          .pipe(
            switchMap(p => this.http.delete(uri)
              .pipe(
                map(prj => taskList)
              )
            )
          );
      }

  // GET /taskLists
  get(userId: string): Observable<TaskList[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    const params = new HttpParams()
      .set('members_like', userId);
    return this.http
      .get<TaskList[]>(uri, { params: params, headers: this.headers });
  }
}