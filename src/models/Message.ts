export interface Message {
	text: string;
	read: boolean;
	date: string;
	formattedDate: Date;
	type?: number;
}
