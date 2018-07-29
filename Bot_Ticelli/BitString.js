/**
 * 
 */

const BITSTRING_MAX_SIZE_BYTES = 128;

//const POW_2 = [1, 2, 4, 8, 16, 32, 64, 128];
const POW_2 = [128, 64, 32, 16, 8, 4, 2, 1];

class BitString {
	
	constructor(bytes) { 
		this.values = new Uint8Array(BITSTRING_MAX_SIZE_BYTES);
		this.byte = bytes - 1;
		this.bit = 7;
		
		for(var i = 0; i < BITSTRING_MAX_SIZE_BYTES; i++) 
			this.values[i] = 0;
	}
	
	addBit(value) { 
		if (this.byte * 8 + this.bit < BITSTRING_MAX_SIZE_BYTES * 8 - 1)  {
			if (this.bit == 7) 
				this.byte++;
			this.bit = (bit == 7) ? 0 : this.bit + 1;
		
			if (value)
				this.values[byte] += POW_2[bit];
		}
	}
	
	getByte(index) {
		return this.values[index];
	}
	
	getBit(index) {
		var byteIndex = Math.floor(index / 8);
		var bitIndex = index % 8;
		var retByte = this.values[byteIndex];
		
		for (var i = 0; i < bitIndex; i++) 
			if (retByte >= POW_2[i]) 
				retByte -= POW_2[i];
		
		if (retByte >= POW_2[bitIndex])
			return true;
		else
			return false;
	}
	
	setByte(index, value) {
		this.values[index] = value;
	}
	
	setBit(index, value) {
		var byteIndex = Math.floor(index / 8);
		var bitIndex = index % 8;
		var current = this.getBit(index);
		
		if (current && !value) 
			this.values[byteIndex] -= POW_2[bitIndex];
		else if (!current && value)
			this.values[byteIndex] += POW_2[bitIndex];
	}
	
	toString() {
		var res = "";
		for(var i = 0; i < (this.byte + 1) * 8 + this.bit + 1; i++)
			res = res + (this.getBit(i) ? "1" : "0");
		return res;
	}
	
}
