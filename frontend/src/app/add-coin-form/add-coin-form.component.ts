import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { circulatingSupplyValidator } from './invalidCirculatingSupply';
import { CoinService } from '../coin.service';
import { Cryptocurrency } from 'src/models/Cryptocurrency';

@Component({
  selector: 'app-add-coin-form',
  templateUrl: './add-coin-form.component.html',
  styleUrls: ['./add-coin-form.component.css']
})
export class AddCoinFormComponent {

  @Output() coinAdded: EventEmitter<Cryptocurrency> = new EventEmitter<Cryptocurrency>();

  constructor(private coinService: CoinService){}



  coinForm = new FormGroup({
    coinName: new FormControl('', [Validators.required]),
    coinSymbol: new FormControl('', [Validators.required]),
    coinCirulatingSupply: new FormControl('', [Validators.required, Validators.min(0), circulatingSupplyValidator]),
    coinTotalSupply: new FormControl('', [Validators.required, Validators.min(0), circulatingSupplyValidator]),
  });

  addNewCoin() {
    const id = 0;
    const name = this.coinForm.get('coinName')!.value as string;
    const symbol = this.coinForm.get('coinSymbol')!.value as string;
    const circulatingSupplyValue = this.coinForm.get('coinCirulatingSupply')!.value;
    const totalSupplyValue = this.coinForm.get('coinTotalSupply')!.value;

    const circulatingSupply = circulatingSupplyValue ? parseFloat(circulatingSupplyValue) : null;
    const totalSupply = totalSupplyValue ? parseFloat(totalSupplyValue) : null;

    if (circulatingSupply != null && totalSupply != null && !isNaN(circulatingSupply) && !isNaN(totalSupply)) {
      const newCoin = new Cryptocurrency(id, name, symbol, circulatingSupply, totalSupply);
      this.coinService.createCryptocurrency(newCoin).subscribe((data: any) => {
        this.coinAdded.emit(data);
      });
    } else {
      console.error('Invalid circulatingSupply or totalSupply value.');
    }
  }


}