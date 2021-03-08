import { Component, OnInit } from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';

interface FoodNode {
  name: string;
  path?: string;
  icon?: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Rick & Morty',
    icon: 'biotech',
    children: [
      {name: 'Episodios', path: '/app/episodes', icon: 'view_carousel'},
      {name: 'Personajes', path: '/app/personage', icon: 'supervisor_account'},
      {name: 'Favoritos', path: '/app/favorites', icon: 'favorite'}
    ]
  }
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  path: string;
  icon: string;
  level: number;
}

@Component({
  selector: 'app-tree-menu',
  templateUrl: './tree-menu.component.html',
  styleUrls: ['./tree-menu.component.scss']
})
export class TreeMenuComponent implements OnInit {

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit(): void {
  }

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      path: node.path,
      icon: node.icon,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}
