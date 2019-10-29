class BinaryHeap {
    constructor(compareFn) {
        this.content = [];
        this.compareFn = compareFn;
    }

     swap(a, b){
        const hold = this.content[a];
        this.content[a] = this.content[b]
        this.content[b] = hold
    }

    size(){
        return this.content.length;
    }

    push(node){
        //add element to end of array. Move it up through array until it finds it's place 
        this.content.push(node)
        this.bubbleUp(this.content.length-1)
    }

    pop(){
        let temp;
        //remove the top element from the array and return it but now re-sort the array but taking the last index
        // - moving to front 
        //- allow to fall through the rest of array
        this.swap(0, this.content.length-1)
        temp = this.content.pop();
        if(this.content.length > 0) this.sinkDown(0);
        return temp;
    }

    sinkDown(idx){
        let child2Index, child1Index, swap, movingIndex = idx;
        const length = this.content.length

        while(true){
            child2Index = (movingIndex+1) * 2;
            child1Index = child2Index-1;
            swap = null
            if(child2Index < length && this.compareFn(this.content[movingIndex], this.content[child2Index])){
                swap = child2Index
            }
            if(child1Index < length && this.compareFn(this.content[movingIndex], this.content[child1Index])){
                if(swap === null) swap = child1Index;
                else {
                    swap = this.compareFn(this.content[child1Index], this.content[child2Index]) ? child2Index: child1Index
                }
            }

            if(swap === null) break;
            else{
                this.swap(movingIndex, swap)
                movingIndex = swap
            }
        }
    }

    bubbleUp(idx){
        let movingIndex = idx
        let parentIndex = Math.floor((movingIndex + 1) / 2) - 1;
        while(this.compareFn(this.content[parentIndex], this.content[movingIndex]) && movingIndex > 0){
            this.swap(movingIndex, parentIndex)
            movingIndex = parentIndex
            parentIndex = Math.floor((movingIndex + 1) / 2) - 1;
        }
    }

    printHeap(){
        return JSON.stringify(this.content)
    }


}

/*
Notes

So array is set up that 2n and 2n+1 are branches of n
So parent of any node is Math.floor(n/2)


*/

//TEST
const testArray = [10, 3, 4, 8, 2, 9, 7, 1, 2, 6, 5]
var heap = new BinaryHeap((a, b) => {return a > b ? true : false;});
testArray.forEach((val) => heap.push(val))
console.log('whats the heap BEFORE', heap.printHeap());
while (heap.size() > 0){
  console.log('what are we popping?', heap.pop())
  console.log('whats the heap after?', heap.printHeap());
}