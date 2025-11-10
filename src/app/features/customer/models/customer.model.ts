export interface Customer {
    _id: string;
    HN: string;
    CustomerID: string;
    Passport: string;
    FirstName: string;
    LastName: string;
    ContactType: string;
    Gender: string;
    Birthdate: string;
    Nationality: string;
    BloodGroup: string;
    PhoneNumber: string;
    Email: string;
    LineID: string;
    Facebook: string;
    AddressMain: Address;
    ContactPerson: ContactPerson;
}

export interface Address  {
	Detail:      string;
	Province:    string;
	District:    string;
	SubDistrict: string;
	PostalCode:  string;
}

export interface ContactPerson {
	FirstName:   string;
	LastName:    string;
	PhoneNumber: string;
	Address:     Address;
}