import { Routes } from '@angular/router';
import { Notfound } from './Components/notfound/notfound';
import { ProductAdd } from './Components/product-add/product-add';
import { Home } from './Components/home/home';
import { Products } from './Components/products/products';
import { Contact } from './Components/contact/contact';

export const routes: Routes = [
  { path: '', redirectTo:'home',pathMatch:'full'},
  {path:'home',component:Home},
  {path:'products',component:Products},
  { path: 'product-add', component:ProductAdd  },
  {path:'contact',component:Contact},
  {path:'**',component:Notfound}
];
