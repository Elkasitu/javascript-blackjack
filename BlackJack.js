// Card Constructor
function Card(suit, number)
{
	var suit = suit;
	var number = number;
	
	this.getNumber = function() // Gets the number of the card.
	{
		return number;
	};
	this.getSuit = function() // Gets the suit of the card.
	{
		return suit;
	};
	this.getValue = function() // Gets the Blackjack value of the card.
	{
		if(number > 10)
		{
			return 10;
		}
		else if(number === 1)
		{
			return 11;
		}
		else
			return number;
	}
}
// Deck
function Deck()
{
	var deck = [];
	var suits = [1,2,3,4];
	var ranks = [1,2,3,4,5,6,7,8,9,10,11,12,13];
	for(var i in suits)
	{
		for(var j in ranks)
		{
			var card = new Card(suits[i], ranks[j])
			deck.push(card);
		}
	}
	return deck;
}
var deck = Deck();
// Random
function rnd()
{
	return (Math.round(Math.random())-0.5);
}
//Shuffle Deck
function ShuffleDeck()
{
	deck.sort(rnd);
}
// Card dealing function
function deal()
{
	ShuffleDeck();
	card = deck.pop();
	return card;
}
// Player's Hand
function Hand()
{
	var array = [];
	array.push(deal());
	array.push(deal());
	this.getHand = function()
	{
		return array;
	};
	this.score = function()
	{
		var score = 0;
		var aces = 0;
		for(var i in array)
		{
			if(array[i].getNumber() === 1)
			{
				aces++;
				score += array[i].getValue();
			}
			else
				score += array[i].getValue();
		}
		while(score > 21 && aces > 0)
		{
			score -= 10;
			aces--;
		}
		return score;
	};
	this.hitMe = function()
	{
		var card = deal();
		array.push(card);
	};
	this.printHand = function()
	{
		result = "";
		for(var i in array)
		{
			switch(array[i].getNumber())
			{
				case 1:
					var num = "Ace";
					break;
				case 11:
					var num = "Jack";
					break;
				case 12:
					var num = "King";
					break;
				case 13:
					var num = "Queen";
					break;
				default:
					var num = array[i].getNumber();
					break;
			}
			switch(array[i].getSuit())
			{
				case 1:
					var suit = "Clubs";
					break;
				case 2:
					var suit = "Hearts";
					break;
				case 3:
					var suit = "Diamonds";
					break;
				case 4:
					var suit = "Spades";
					break;
				default:
					break;
			}
			result += num + " of " + suit + "\n";
		}
		return result;
	};
}

function playAsDealer()
{
	var hand = new Hand();
	while(hand.score() < 17)
	{
		hand.hitMe();
	}
	return hand;
}

function playAsUser()
{
	var hand = new Hand();
	var hit = confirm("Your hand is: \n" + hand.printHand() + "Hit OK to hit or Cancel to stand");
	while(hit)
	{
		hand.hitMe();
		hit = confirm("Your hand is: \n" + hand.printHand() + "Hit OK to hit again or Cancel to stand");
		if(hand.score() > 21)
		{
			break;
		}
	}
	return hand;
}

function declareWinner(userHand, dealerHand)
{
	var user = userHand.score();
	var dealer = dealerHand.score();
	if(user <= 21 && dealer <= 21)
	{
		if(user > dealer)
			return "You win!";
		else if(dealer > user)
			return "You lose!";
		else
			return "You tied!";
	}
	else if(user <= 21 && dealer > 21)
		return "You win!";
	else if(user > 21 && dealer <= 21)
		return "You lose!";
	else
		return "You tied!";
}
// Global counter variables
var usrCount = 0;
var dlrCount = 0;
// Main function
function playGame()
{
	var user = playAsUser();
	var dealer = playAsDealer();
	var win = declareWinner(user, dealer);
	switch(win)
	{
		case "You win!":
			usrCount++;
			break;
		case "You lose!":
			dlrCount++;
			break;
		default:
			break;
	}
	alert("Your hand: \n" + user.printHand() + "Total: " + user.score() +
	"\n\nYour opponent's hand: \n" + dealer.printHand() + "Total: " + dealer.score() +
	"\n" + win);
}
function blackJack()
{
	deck = Deck();
	playGame();
	alert("You have won " + usrCount + " times. \n" + "The dealer has won " + dlrCount + " times.");
	var replay = confirm("Play again?");
	if(replay)
		blackJack();
}