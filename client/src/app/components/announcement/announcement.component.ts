import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { IAnnouncement, ITransaction, PagedData, UserType } from 'src/app/shared/types';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent implements OnInit {
  loading: boolean = false;
  dataSource: IAnnouncement[] = [];
  startDate?: Date = undefined;
  endDate?: Date = undefined;

  constructor(private _announcementService: AnnouncementService, private _dialog: MatDialog) {
    this.getAnnouncement();
  }

  getAnnouncement(): void {
    this.loading = true;
    this._announcementService.getAllAnnouncements().subscribe({
      next: (data) => {
        this.loading = false;
        const resdata = data.data as PagedData<IAnnouncement>;
        this.dataSource = resdata.data!;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    });
  }

  ngOnInit(): void {}
}
