import '../css/index.scss';

const foo = {
    a: 'a',
    b: 'b'
};

console.log(
    {
        ...foo,
        c: 'c'
    }
);