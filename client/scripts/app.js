var app = angular.module('acquireApp', [])

class BoardSpace {
    #row;
    #col;
    #label;
    title = '';

    occupied = false;
    company = -1;

    constructor(row, col) {
        this.#row = row;
        this.#col = col;

        this.#label = (this.#row + 1).toString() + String.fromCharCode('A'.charCodeAt() + this.#col);
    }

    get label() {
        return this.#label;
    }

    get class() {
        if (this.occupied) {
            var classString = 'occupied';

            if (this.company >= 0) {
                classString += ' company' + this.company;
            }

            return classString;
        } else {
            return 'free';
        }
    }
}

class Corporation {
    #id;
    #name = '';
    #on_board = false;
    #stocks_available = 25;
    #stock_price = 200;

    constructor(id, name) {
        this.#id = id;
        this.#name = name;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get available() {
        return this.#stocks_available;
    }

    get price() {
        if (this.#on_board) {
            return '$' + this.#stock_price;
        } else {
            return '---';
        }
    }
}

class Tile {
    #id;

    constructor(id) {
        this.#id = id;
    }

    get id() {
        return this.#id;
    }

    onMouseIn() {
        document.getElementById(this.#id).classList.add('hovered');
    }

    onMouseOut() {
        document.getElementById(this.#id).classList.remove('hovered');
    }
}

app.controller('boardCtrl', function ($scope, $http) {

    $scope.rows = [];
    for (row = 0; row < 10; row++) {
        $scope.rows.push([]);
        for (col = 0; col < 10; col++) {
            $scope.rows[row].push(new BoardSpace(row, col));
        }
    }
    $scope.rows[3][2].occupied = true;
    $scope.rows[2][4].occupied = true;

    $scope.rows[7][7].occupied = true;
    $scope.rows[7][7].company = 0;
    $scope.rows[7][7].title = 'Techno\nSize: 3\nCannot be merged';
    $scope.rows[6][7].occupied = true;
    $scope.rows[6][7].company = 0;
    $scope.rows[7][6].occupied = true;
    $scope.rows[7][6].company = 0;

    $scope.rows[5][0].occupied = true;
    $scope.rows[5][0].company = 1;

    $scope.rows[9][5].occupied = true;
    $scope.rows[9][5].company = 2;

    $scope.rows[1][8].occupied = true;
    $scope.rows[1][8].company = 3;

    $scope.rows[4][4].occupied = true;
    $scope.rows[4][4].company = 4;

    $scope.rows[7][0].occupied = true;
    $scope.rows[7][0].company = 5;

    $scope.rows[6][3].occupied = true;
    $scope.rows[6][3].company = 6;
    $scope.rows[7][3].occupied = true;
    $scope.rows[7][3].company = 6;
});

app.controller('corporationCtrl', function ($scope, $http) {
    $scope.corporations = [
        new Corporation(0, 'Techno'),
        new Corporation(1, 'Gizmo'),
        new Corporation(2, 'Unicorn'),
        new Corporation(3, 'DotCom'),
        new Corporation(4, 'Avago'),
        new Corporation(5, 'Leaf'),
        new Corporation(6, 'Progresso')
    ];
});

app.controller('tilesCtrl', function($scope, $http) {
    $scope.tiles = [];
    $scope.tiles.push(new Tile('2D'));
    $scope.tiles.push(new Tile('5F'));
    $scope.tiles.push(new Tile('7A'));
    $scope.tiles.push(new Tile('9H'));
    $scope.tiles.push(new Tile('8B'));
    $scope.tiles.push(new Tile('4G'));
});