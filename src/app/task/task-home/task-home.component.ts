import { Component, OnInit, ChangeDetectorRef,HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { slideToRight } from '../../anims/router.anim'

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [slideToRight]
})
export class TaskHomeComponent implements OnInit {

  @HostBinding('@routeAnim') state;

  placehoder: 'ajskhdkasjhd';
  lists = [
    {
      id: 1,
      name: "待办",
      order: 1,
      tasks: [
        {
          id: 1,
          desc: '任务一：去卖咖啡星巴克',
          completed: true,
          priority: 3,
          owner: {
            id: 1,
            name: '阿山',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          reminder: new Date(),
        },
        {
          id: 2,
          desc: '任务二：完成老板布置的ppt作业',
          completed: false,
          priority: 2,
          owner: {
            id: 1,
            name: '李四',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
        },
        {
          id: 1,
          desc: '任务三：项目代码评审',
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: '王五',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date(),
        },
        {
          id: 2,
          desc: '任务四：制定项目计划',
          completed: false,
          priority: 2,
          owner: {
            id: 1,
            name: '李四',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
        },
        {
          id: 2,
          desc: '任务四：制定项目计划',
          completed: false,
          priority: 3,
          owner: {
            id: 1,
            name: '李四',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
        },    
      ]
    },
    {
      id: 2,
      name: "进行中",
      order: 2,
      tasks: [
        {
          id: 1,
          desc: '任务一：去卖咖啡星巴克',
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: '阿山',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
        },
        {
          id: 2,
          desc: '任务二：完成老板布置的ppt作业',
          completed: false,
          priority: 2,
          owner: {
            id: 1,
            name: '李四',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
        },
        {
          id: 1,
          desc: '任务三：项目代码评审',
          completed: false,
          priority: 3,
          owner: {
            id: 1,
            name: '王五',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date(),
        },
        {
          id: 2,
          desc: '任务四：制定项目计划',
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: '李四',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
        },
        {
          id: 2,
          desc: '任务四：制定项目计划',
          completed: false,
          priority: 1,
          owner: {
            id: 1,
            name: '李四',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
        },    
      ]
    }
  ] 
    

  constructor(private dialog: MatDialog, private cd: ChangeDetectorRef) { }
//对传入数组进行操作的方法需要增加markForCheck()方法
  ngOnInit() {
  }

  launchNewTaskDialog(){
    const dislogRef = this.dialog.open(NewTaskComponent,{data:{title:"新建任务"}});
  }

  launchCopyTaskDialog(){
    const dislogRef = this.dialog.open(CopyTaskComponent,{data:{lists:this.lists}});
  }

  launchUpdateTaskDialog(task){
    const dislogRef = this.dialog.open(NewTaskComponent,{data:{title:"修改任务", task:task}})
  }

  launchConfirmDialog(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{data:{title: '删除列表：',content:"确定删除该列表吗"}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchEditListDialog(){
    const dialogRef = this.dialog.open(NewTaskListComponent,{data:{title: "更改列表名称："}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  openNewListDialog(){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,{data:{title: '新建列表：'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  handleMove(srcData,list){
    switch (srcData.tag) {
      case 'task-item':
        console.log('handling item');
        break;
      case 'task-list':
        console.log('handling list');
        const srcList = srcData.data;
        const tempOrder = srcList.order;
        srcList.order = list.order;
        list.order = tempOrder;
        break;
      default:
        break;
    }
  }

  handleQuickTask(desc: string){
    console.log(desc)
  }

}
