import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Project, User } from '../domain';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { from } from 'rxjs/observable/from';
import { mergeMap, count, switchMap, map } from 'rxjs/operators';


@Injectable()
export class ProjectService {
    private readonly domain = 'projects';
    private headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
    constructor(
        private http: HttpClient, 
        @Inject('BASE_CONFIG') private config: { uri: string }){

    }

    // POST /projects
    add(project: Project): Observable<Project> {
        const uri = `${this.config.uri}/${this.domain}`;
        project.id = null;
        return this.http
            .post<Project>(uri, JSON.stringify(project), { headers: this.headers });
    }



    //put,更新全部字段，patch可以选择更新的字段
    update(project: Project): Observable<Project>{
        const uri = `${this.config.uri}/${this.domain}/${project.id}`;
        const toUpdate = {
            name: project.name,
            desc: project.desc,
            coverImg: project.coverImg,
        }
        return this.http
            .patch<Project>(uri, JSON.stringify(toUpdate), { headers: this.headers });
    }

    //delete
    del(project: Project): Observable<Project> {
        const deltask$ = from(project.taskLists ? project.taskLists : [])
          .pipe(
            mergeMap(listId => this.http
              .delete(`${this.config.uri}/taskLists/${listId}`)),
            count()
          );
        const uri = `${this.config.uri}/${this.domain}/${project.id}`;
        return deltask$
          .pipe(
            switchMap(p => this.http.delete(uri)
              .pipe(
                map(prj => project)
              )
            )
          );
      }

  // GET /projects
  get(userId: string): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    const params = new HttpParams()
      .set('members_like', userId);
    return this.http
      .get<Project[]>(uri, { params: params, headers: this.headers });
  }
}