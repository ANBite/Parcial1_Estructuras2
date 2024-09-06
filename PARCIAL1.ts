//Tablas hash
//Farmacia
//Allan Francisco Moisés Chaclán Guinea - 1502023

//Clase Nodo
class NodoFarmacia {
    producto: Farmacia;
    next: NodoFarmacia | null;

    constructor(producto: Farmacia) {
        this.producto = producto;
        this.next = null;
    }
}


//Clase farmacia
class Farmacia {
    private codigo: number;
    private nombre: string
    private preciocosto: number;
    private precioventa: number;

    constructor(codigo: number, name: string, costo: number, venta: number) {
        this.codigo = codigo;
        this.nombre = name;
        this.preciocosto = costo;
        this.precioventa = venta;
    }

    public getcodigo(): number {
        return this.codigo;
    }

    public getnombre(): string {
        return this.nombre;
    }

    public getcosto(): number {
        return this.preciocosto;
    }

    public getventa(): number {
        return this.precioventa;
    }

    public imprimirtodo(): string {
        return "Código: " + this.codigo + " Nombre: " + this.nombre + " Precio costo: " + this.preciocosto + " Precio venta: " + this.precioventa;
    }
}


//Clase lista
class Lista {
    head: NodoFarmacia | null;

    constructor() {
        this.head = null;
    }

    public insert(productos: Farmacia): void {
        const newnode = new NodoFarmacia(productos);
        if (this.head === null) {
            this.head = newnode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newnode;
        }
    }

    public search(codigo: number): Farmacia | null {
        let current = this.head;
        while (current !== null) {
            if (current.producto.getcodigo() === codigo) {
                return current.producto;
            }
            current = current.next;
        }
        return null;
    }

    public print(): string {
        const students: string[] = [];
        let current = this.head;
        while (current !== null) {
            students.push(current.producto.imprimirtodo());
            current = current.next;
        }
        return students.join(" -> ");
    }
}

//Clase Tabla Hash
class TablaHash {
    private size: number;
    private data: (Lista | null)[];

    constructor() {
        this.size = 31; //Tamaño de la tabla hash
        this.data = new Array(this.size).fill(null);
    }

    private hash(codigo: number): number {
        return (codigo) % this.size;
    }

    public insert(productoss: Farmacia): void {
        let index: number = this.hash(productoss.getcodigo());
        if (this.data[index] === null) {
            this.data[index] = new Lista();
        } else {
            // Para asegurar que cada producto se inserte en un arreglo diferente
            let i = 1;
            while (this.data[(index + i) % this.size] !== null) {
                i++;
            }
            this.data[(index + i) % this.size] = new Lista();
            this.data[(index + i) % this.size]!.insert(productoss);
            return;
        }
        this.data[index]!.insert(productoss);
    }

    public search(cod: number): Farmacia | null {
        let index: number = this.hash(cod);
        if (this.data[index] !== null) {
            return this.data[index]!.search(cod);
        }
        return null;
    }

    public printEstantería(): void {
        this.data.forEach((slot, i) => {
            if (slot === null) {
                console.log("P" + i + " null");
            } else {
                console.log("P" + i + ": " + slot.print());
            }
        });
    }
}

let farmacy = new TablaHash();


//Ingreso producto 1
//p en ascci = 80


let producto1 = new Farmacia(975, "peptobismol", 50, 65)
farmacy.insert(producto1)
//console.log(`\n${array}\n`)

let producto2 = new Farmacia(175, "ibuprofeno", 30, 45)
farmacy.insert(producto2)

let producto3 = new Farmacia(908, "Tapsin", 7, 10)
farmacy.insert(producto3)

let producto4 = new Farmacia(658, "ibuprofeno2", 6, 45)
farmacy.insert(producto4)

let producto5 = new Farmacia(545, "ib3", 98, 45)
farmacy.insert(producto5)

let producto6 = new Farmacia(901, "ibupr5eno", 13, 45)
farmacy.insert(producto6)

let producto7 = new Farmacia(102, "ibupro", 78, 45)
farmacy.insert(producto7)

let producto8 = new Farmacia(857, "ibeno", 6, 45)
farmacy.insert(producto8)

let producto9 = new Farmacia(840, "ibup", 34, 45)
farmacy.insert(producto9)

let producto10 = new Farmacia(999, "ibeno", 9, 45)
farmacy.insert(producto10)


//Buscar
if (farmacy.search(1) != null) {
    console.log("producto encontrado")
    console.log(farmacy.search(1))
} else {
    console.log("No se encontró el producto")
}


//Imprimir todo
console.log("\n")
console.log(farmacy.printEstantería())

console.log("\n")
console.log("Allan Francisco Moisés Chaclán Guinea - 1502023")
