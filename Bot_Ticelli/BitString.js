/**
 * 
 */

const BITSTRING_MAX_SIZE_BYTES = 128;
const POW_2 = [128, 64, 32, 16, 8, 4, 2, 1];

class BitString {

	constructor(bytes) { 
		this.values = new Uint8Array(BITSTRING_MAX_SIZE_BYTES);
		this.byte = bytes - 1;
		this.bit = 7;

		for(var i = 0; i < BITSTRING_MAX_SIZE_BYTES; i++) 
			this.values[i] = 0;
	}

	clone() {
		var res = new BitString(0);
		res.concat(this);
		return res;
	}

	addBit(value) { 
		if (this.bit == 7) 
			this.byte++;
		this.bit = (this.bit == 7) ? 0 : this.bit + 1;

		this.setBit(this.length() - 1, value);
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

	flip(index) { 
		this.setBit(index, !this.getBit(index));
	}


	length() { 
		return this.byte * 8 + this.bit + 1;
	}

	setLength(len) {
		this.byte = Math.floor((len - 1) / 8);
		if (len > 0)
			this.bit = (len - 1) % 8;
		if (len == 0)
			this.bit = 7;
	}

	concat(bs) { 
		for (var i = 0; i < bs.length(); i++) 
			this.addBit(bs.getBit(i));
	}

	substring(begin, end) {
		var result = new BitString(0);
		for (var i = begin; i < end; i++)
			result.addBit(this.getBit(i));
		return result;
	}

	toString() {
		var res = "";
		for(var i = 0; i < this.length(); i++) { 
			res = res + (this.getBit(i) ? "1" : "0");
			if (i % 8 == 7 && i != this.length() - 1)
				res = res + "-";
		}
		return res;
	}

}
