import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionService } from 'src/app/services/transaction.service';
import { ITransaction } from 'src/app/shared/types';
import { TransactionDeleteComponent } from '../transaction-delete/transaction-delete.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  loading: boolean = false;

  displayedColumns: string[] = [
    '#',
    'Invoice',
    'Description',
    'TransactionDate',
    'Beneficiary',
    'Paid',
    'Recieved',
  ];
  dataSource: ITransaction[] = [];
  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor(private _transactionService: TransactionService, private _dialog: MatDialog) {
    this.getTransactions();
  }

  getTransactions(): void {
    this.loading = true;
    this._transactionService.getAllTransactions(1, 10).subscribe({
      next: (data) => {
        this.loading = false;
        this.dataSource = data.data!;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    });
  }

  ngOnInit(): void {}

  openDeleteArticle(data: ITransaction) {
    const matDialogRef = this._dialog.open(TransactionDeleteComponent, {
      data: {
        _id: data._id,
      },
    });

    matDialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getTransactions();
      }
    });
  }
}
