# Eco-Track
A supply chain system to force organizations to use Eco-friendly products and at the same time help organizations to get all materials they need to recycle a product. Using IOTA the next generation distributed ledger based on Tangle

## Run IOTA In Private Mode
To run our application you need first to set up an  IRI (iota reference implementation) node.
```
cd private_Tangle/one-command-tangle
sudo docker-compose up
```
Modify `IotaGlobal.js` to make sure the provider link is  http://localhost:14265
```
cd Eco-Track/website/api/models/actions/Functions/MAM
nano IotaGlobal.js
```
At line 11
```
const providerLink = 'http://localhost:14265'
```
## Run IOTA In Public Mode
Modify `IotaGlobal.js` to make sure the provider link is https://nodes.comnet.thetangle.org/
```
cd Eco-Track/website/api/models/actions/Functions/MAM
nano IotaGlobal.js
```
At line 11
```
const providerLink = 'https://nodes.comnet.thetangle.org/'
```
## Run Eco-Track
### Run  Full-Stack 
```
cd Eco-Track/website
npm start
```
### Run Backend Only
```
cd Eco-Track/API
npm start
```
note that for production you need only to replace `npm start` with `pm2 start server.js`
## Run Components Seperatly
If you want to test our database IPFS tangle Database only, API Recycler, API products-Tracker or communication modules using masked authentication system and IPFS
```
cd prototypes
```
To run any prototype you need only
```
npm i
npm start
```
## Learn More
You can check our R&D branch, For modules implementation and pdf resources.
```
git checkout -b  R&D
```
