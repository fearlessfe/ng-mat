import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';


const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/login',
        pathMatch: 'full' 
    },
    {
        path: 'projects',
        redirectTo: '/projects',
        pathMatch: 'full' 
    },
    {
        path: 'tasklist',
        redirectTo: '/tasklist',
        pathMatch: 'full' 
    },
];

@NgModule({
    imports: [CommonModule, RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
