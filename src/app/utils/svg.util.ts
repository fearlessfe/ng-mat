import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

//加载本地Svg文件
export const loadSvgResources = (ir:MatIconRegistry, ds: DomSanitizer) => {
    const imgDir = 'assets/img';
    ir.addSvgIcon('day',ds.bypassSecurityTrustResourceUrl('assets/img/sidebar/day.svg'));
    ir.addSvgIcon('month',ds.bypassSecurityTrustResourceUrl('assets/img/sidebar/month.svg'));
    ir.addSvgIcon('project',ds.bypassSecurityTrustResourceUrl('assets/img/sidebar/project.svg'));
    ir.addSvgIcon('projects',ds.bypassSecurityTrustResourceUrl('assets/img/sidebar/projects.svg'));
    ir.addSvgIcon('week',ds.bypassSecurityTrustResourceUrl('assets/img/sidebar/week.svg'));
    ir.addSvgIcon('add',ds.bypassSecurityTrustResourceUrl('assets/img/icons/add.svg'));
    const dayDir = `${imgDir}/days`;
    const days = [
        1,2,3,4,5,6,7,8,9,10,
        11,12,13,14,15,16,17,18,19,20,
        21,22,23,24,25,26,27,28,29,30,31
    ];
    days.forEach(day => ir.addSvgIcon(`day${day}`,ds.bypassSecurityTrustResourceUrl(`${dayDir}/day${day}.svg`)));
    const avatarDir = `${imgDir}/avatar`;
    ir.addSvgIconSetInNamespace('avatars',ds.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`));
    ir.addSvgIcon('unassigned',ds.bypassSecurityTrustResourceUrl(`${avatarDir}/unassigned.svg`));
    const iconsDir=`${imgDir}/icons`;
    ir.addSvgIcon('move',ds.bypassSecurityTrustResourceUrl(`${iconsDir}/move.svg`));
    ir.addSvgIcon('add',ds.bypassSecurityTrustResourceUrl(`${iconsDir}/add.svg`));
    ir.addSvgIcon('delete',ds.bypassSecurityTrustResourceUrl(`${iconsDir}/delete.svg`));
}