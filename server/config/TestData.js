module.exports = {
    operators : operatorsData,
    codes: codesData
};

function operatorsData(){
    return [
        {
            operatorName: 'Operator1',
            operatorImageURL: 'http://placehold.it/150x150&text=Operator1'
        },
        {
            operatorName: 'Operator2',
            operatorImageURL: 'http://placehold.it/150x150&text=Operator2'
        }
    ]
}

function codesData(){
    return [
        {
            title: 'CodeForOperator1',
            ussdCode: '*123*1#'
        },
        {
            title: 'CodeForOperator2',
            ussdCode: '*123*2#'
        }
    ]
}
