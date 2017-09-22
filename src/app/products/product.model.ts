export class Product {

  createByLS(json: any) {
    this._title = json["_title"] || "";
    this._description = json["_description"] || "";
    this._image = json["_image"] || "";
    this._price = json["_price"] || 0;
  }

  constructor(
    private _title: string = "",
    private _description: string = "",
    private _image: string = "",
    private _price: number = 0
  ) {}

  public get title(): string {
    return this._title;
  }

  public set title(title: string) {
    this._title = title;
  }

  public get description(): string {
    return this._description;
  }

  public set description(description: string) {
    this._description = description;
  }

  public get image(): string {
    return this._image;
  }

  public set image(image: string) {
    this._image = image;
  }

  public get price(): number {
    return this._price;
  }

  public set price(price: number) {
    this._price = price;
  }
}
