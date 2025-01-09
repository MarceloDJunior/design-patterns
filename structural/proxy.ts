// The Proxy Design Pattern is a structural design pattern that provides an object representing another object. 
// It acts as an intermediary, controlling access to the original object. This pattern is useful in scenarios where 
// you want to add an additional layer of control, such as lazy initialization, access control, logging, or caching.

// Key concepts:
// Subject Interface: This defines the common interface for both the RealSubject and Proxy classes. 
// It declares the methods that the Proxy and RealSubject will implement.
// Real Subject: This is the class that represents the actual object that the proxy will represent. 
// It contains the real business logic.
// Proxy: This class implements the same interface as the RealSubject and holds a reference to a RealSubject object. 
// It controls access to the RealSubject and can add additional functionality before or after forwarding requests to the RealSubject.

// Example of a proxy implementation caching an image on subsequent access

// Subject Interface
interface Image {
    display(filename: string): void; // Update method to accept filename
}

// RealSubject
class RealImage implements Image {
    private filename: string;

    constructor(filename: string) {
        this.filename = filename;
        this.loadImageFromDisk(); // Simulate heavy loading
    }

    private loadImageFromDisk(): void {
        console.log(`Loading image: ${this.filename}`);
    }

    public display(): void {
        console.log(`Displaying image: ${this.filename}`);
    }
}

// Proxy with Caching
class ProxyImage implements Image {
    private imageCache: { [key: string]: RealImage }; // Cache to store loaded images

    constructor() {
        this.imageCache = {}; // Initialize cache
    }

    public display(filename: string): void {
        if (!this.imageCache[filename]) {
            // Load the real image only if it's not in the cache
            this.imageCache[filename] = new RealImage(filename); // Cache the loaded image
        }
        this.imageCache[filename].display(); // Delegate the call to RealImage
    }
}

// Client Code
const proxyImage = new ProxyImage();

proxyImage.display("photo1.jpg"); // Loading and displaying the image
proxyImage.display("photo1.jpg"); // Only displaying the already loaded image
proxyImage.display("photo2.jpg"); // Loading and displaying another image
proxyImage.display("photo2.jpg"); // Only displaying the already loaded image
