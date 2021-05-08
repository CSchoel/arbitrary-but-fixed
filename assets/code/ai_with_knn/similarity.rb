require 'set'

subject = "Subject: The Guardian Nigeria

I just learned that Nigeria has a newspaper called \"The Guardian Nigeria\".
You don't find Prince Harry on the front page here, but you sure do find him: https://guardian.ng/tag/prince-harry/ :D"
spam = "Subject: Need trustworthy business partner

I am Mohammed Abacha, prince of Nigeria.
I am the son of the late Nigerian Head of State who died on the 8th of June 1998.
I have secretly deposited the sum of $30,000,000.00 with a security firm abroad.
I shall be grateful if you could receive this fund into your Bank account for safekeeping."
ham = "Subject: The tabloids are at it again

This is a great one: Woman&home titles \"Meghan Markle and Prince Harry weren't in 'great shape' mentally - reveals Tom Bradby who interviewed them on Africa tour\".
And in that SAME article talking about mental health, they end with \"In other royal news, the Duchess of Cambridge stuns in red as she steps out in London to promote photography book launch.\"
Can you believe it?! In other news ;), how are things in Nigeria?"

def matching_words s1, s2
    set1 = Set.new(s1.downcase.split(/[ ,:?!;\n.]/))
    set2 = Set.new(s2.downcase.split(/[ ,:?!;\n.]/))
    #puts "compare"
    #puts set1
    #puts set2
    return set1 & set2
end

puts matching_words(subject, spam)
puts matching_words(subject, ham)