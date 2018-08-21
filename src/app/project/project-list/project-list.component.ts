import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim'
import { ProjectService } from '../../services/project.service';
import { Project } from '../../domain';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [slideToRight,listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {

  @HostBinding('@routeAnim') state;
  projects = [
    {
      "id": 1,
      "name": "企业协作平台",
      "desc": "内部项目",
      "coverImg": "assets/img/covers/0.jpg"
    },
    {
      "id": 2,
      "name": "企业协作平台1",
      "desc": "内部项目1",
      "coverImg": "assets/img/covers/1.jpg"
    },
    {
      "id": 3,
      "name": "企业协作平台2",
      "desc": "内部项目2",
      "coverImg": "assets/img/covers/2.jpg"
    },
  
  ]

  constructor(
    private dialog: MatDialog, 
    private cd: ChangeDetectorRef,
    private service$: ProjectService
  ) { }

  ngOnInit() {
    this.service$.get("1").subscribe(
      projects => this.projects = projects
    )
  }

  openNewProjectDialog(){
    const dialogRef = this.dialog.open(NewProjectComponent,{data:{title: '新增项目：'}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = [...this.projects,{
        "id": 4,
        "name": "123123123",
        "desc": "12312312",
        "coverImg": "assets/img/covers/4.jpg"
      },{
        "id": 5,
        "name": "55555552",
        "desc": "555552",
        "coverImg": "assets/img/covers/5.jpg"
      },]
    });
    this.cd.markForCheck();
  }

  launchInviteDialog(){
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launchUpdateDialog(project){
    const dialogRef = this.dialog.open(NewProjectComponent,{data:{title: '编辑项目：',project: project}});
  }
  //删除任务
  
  launchConfirmDialog(project){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{data:{title: '删除项目：',content:"确定删除该项目吗"}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter(p => p.id !== project.id);
    });
    this.cd.markForCheck();
  }

  

}
