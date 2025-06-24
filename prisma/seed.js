const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const gotNotes = [
  {
    title: "Stark Ailesi'nin Şifreli Mesajı",
    text: "Kış geliyor. Kuzey asla unutmaz. Winterfell'in duvarlarında gizli bir geçit buldum. Eski Tanrıların Koruluğu'nun altında gizli bir hazine olabilir.",
    color: "#2D3748" // Stark Grey
  },
  {
    title: "Ejderha Yumurtaları Hakkında Not",
    text: "Daenerys'in ejderha yumurtaları ateşte canlandı. Targaryen kanı gerçekten de ejderha kanı. Valyrian çeliğinin sırrı ateş ve kan büyüsünde olabilir.",
    color: "#C53030" // Targaryen Red
  },
  {
    title: "Gece Nöbetçileri'nin Keşfi",
    text: "Duvar'ın ötesinde Ak Gezenler hareketleniyor. Jon Snow'un raporuna göre, Hardhome'da büyük bir tehlike var. Ölüler yürüyor.",
    color: "#2A4365" // Night's Watch Blue
  },
  {
    title: "Lannister Ailesinin Sırları",
    text: "Casterly Rock'ın altın madenleri kurudu. Tywin Lannister bu gerçeği herkesten saklıyor. Demir Bankası'na olan borçlar endişe verici boyutta.",
    color: "#C05621" // Lannister Gold
  },
  {
    title: "Küçük Parmak'ın Komploları",
    text: "Vale'deki dedikodulara göre Lysa Arryn'in ölümü şüpheli. Petyr Baelish'in Eyrie'deki planları tahmin ettiğimizden daha derin olabilir.",
    color: "#2C7A7B" // Vale Green
  },
  {
    title: "Dorne'un Gizli İttifakı",
    text: "Martell ailesi Targaryen restorasyonunu desteklemeyi planlıyor. Prenses Arianne, Doran'ın uzun vadeli planının bir parçası.",
    color: "#B7791F" // Dorne Orange
  },
  {
    title: "Greyjoy Donanması'nın Hazırlıkları",
    text: "Demir Adalar'da yeni gemiler inşa ediliyor. Yara Greyjoy, Ejderha Kraliçesi ile ittifak arayışında. Euron'un planları tehlikeli görünüyor.",
    color: "#2B6CB0" // Greyjoy Blue
  },
  {
    title: "Üç Gözlü Karga'nın Vizyonu",
    text: "Brandon Stark'ın görüleri güçleniyor. Kışyarı'ndaki Kalp Ağacı üzerinden geçmişe dair yeni sırlar keşfedildi. R + L = J teorisi doğrulanıyor.",
    color: "#4C51BF" // Mystical Purple
  },
  {
    title: "Melisandre'nin Kehaneti",
    text: "Kızıl Rahibe'nin alevlerde gördüğü: 'Azor Ahai yeniden doğacak. Uzun Gece yaklaşıyor ve şafak kılıcı ateşle dans edecek.'",
    color: "#9B2C2C" // Red Priestess Red
  },
  {
    title: "Sam'in Citadel Araştırması",
    text: "Ak Gezenleri durdurmak için Valyrian çeliği ve ejderha camı kritik öneme sahip. Eski Valyria'nın kayıp büyüleri hakkında yeni bilgiler buldum.",
    color: "#4A5568" // Maester Grey
  }
];

async function main() {
  console.log('Seeding database...');
  
  // Mevcut notları temizle
  await prisma.note.deleteMany();
  
  // Yeni notları ekle
  for (const note of gotNotes) {
    await prisma.note.create({
      data: note
    });
  }
  
  console.log('Seed completed! 🎉');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 