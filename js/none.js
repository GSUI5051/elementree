addLayer("none", {
  layerShown: false,
  infoboxes: {
      story: {
          title: "Story",
          body: () => {
            const amountMastered = ["f"/*, "e", "w", "a"*/].filter(element => hasUpgrade(element, 31)).length
            if (amountMastered === 4) return `WELL DONE! You have mastered EVERY core element. You thought this was the end? Haha, no, you still need to master the sub-elements! Good luck because no Avatar has mastered every element, not even me OR Korra! Although Korra was a pretty bad Avatar not going to lie haha sorry Korra. Anyways, good luck!`
            if (amountMastered === 3) return `HOW! This is impossible, you have mastered 3 elements FASTER than me! I must say you are the best Avatar i have seen but i'm not sure in general. One last element to go!`
            if (amountMastered === 2) return `You have already mastered ${player.chosen[1]}?!?!! This is insane speed, i can already tell you are gonna be one of the best Avatars i have EVER seen! 2 Elements to master now! Good luck! You will definately need it!`
            if (amountMastered === 1) return `A whole element mastered in such a short time! Tell me, how hard was it to master ${player.chosen[0]}? Haha, good luck on the next element. Anyways good luck! `
            if (player.chosen.length === 1) return `So, you have chosen to master ${player.chosen[0]}? Good luck on this journey, this is just one of many elements and sub-elements you can master. 0 Core elements down, 4 Core elements to go haha! And as always, good luck!`
            return `Hello, you may not know me but I am Aang, the previous Avatar. By fate, you are the lucky soul to be the next Avatar! You currently have not mastered any element. Master each element one by one to become the best avatar there has ever been, and who knows, maybe you will be better than me! Haha, i doubt that but you can try! I guess we will both see. But i believe you can master every element and be the best Avatar ever!`
          }
      }
  }
})
