import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  loading: boolean = false;

  // invoice: string | undefined;
  // description: string | undefined;
  // transactionDate: Date | undefined ;
  // transactionTo:string | undefined ;

  displayedColumns: string[] = ['#', 'Invoice', 'Description', 'TransactionDate', 'Beneficiary', 'Paid','Recieved'];
  dataSource = [
    {
      invoice:'1128278',
      description: '2y27jhsdhjjhs',
      txnDate: new Date(),
      transactionTo: 'user',
      paid: 12772,
      recieved: 2727

  },
  {
    invoice:'1128278',
    description: '2y27jhsdhjjhs',
    txnDate: new Date(),
    transactionTo: 'user',
    paid: 12772,
    recieved: 2727

}, {
  invoice:'1128278',
  description: '2y27jhsdhjjhs',
  txnDate: new Date(),
  transactionTo: 'user',
  paid: 12772,
  recieved: 2727

}, {
  invoice:'1128278',
  description: '2y27jhsdhjjhs',
  txnDate: new Date(),
  transactionTo: 'user',
  paid: 12772,
  recieved: 2727

}
  ];


  constructor() { }


  ngOnInit(): void {
  }

}
